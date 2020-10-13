package com.websites.partout.utils;

import com.websites.partout.dao.RolesRepo;
import com.websites.partout.dao.UsersRolesRepo;
import com.websites.partout.model.Roles;
import com.websites.partout.model.User;
import com.websites.partout.model.UsersRoles;
import com.websites.partout.search.GenericSpecification;
import com.websites.partout.search.SearchCriteria;
import com.websites.partout.search.SearchOperation;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.*;
import java.util.function.Function;

@CrossOrigin(origins = "http://localhost:3000")
@Service
public class JwtUtil {
    @Autowired
    UsersRolesRepo usersRolesRepo;

    @Autowired
    RolesRepo rolesRepo;

    @Value("'dM&4}4%J0prOQ5b>0[tUIf#)<qGg{ZimZ]JL&rh@^GZ3?m}#]kf1'Y:U9=g5Rk[~f2")
    private String SECRET_KEY;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public ArrayList<String> extractRoles(String token) {
        return extractRolesClaim(token);
    }

    public int extractCallerId(String token) {
        return extractIdClaim(token);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public ArrayList<String> extractRolesClaim(String token) {
        final Claims claims = extractAllClaims(token);
        return (ArrayList<String>) claims.get("roles");
    }

    public int extractIdClaim(String token) {
        final Claims claims = extractAllClaims(token);
        return (int) claims.get("id_user");
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(User userDetails) {
        Map<String, Object> claims = new HashMap<>();
        Set<String> userRoles = getRoles(userDetails);
        // Place roles in JWT token claim
        claims.put("roles", userRoles.toArray());
        // Place user id in JWT token claim
        claims.put("id_user", userDetails.getId_User());

        // Create token
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 900000)) // 900000 * 8 - 15min * 8
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Set<String> getRoles(User userDetails) {
        Set<String> userRoles = new HashSet<>();
        // Create an array to store all roles
        List<Roles> roles = new ArrayList<>();
        // Get user id
        Integer userId = userDetails.getId_User();
        // Search how many roles does user have by id
        GenericSpecification genericSpecification = new GenericSpecification<UsersRoles>();
        genericSpecification.add(new SearchCriteria("fkUserId", userId, SearchOperation.EQUAL));
        List<UsersRoles> rolesIds = usersRolesRepo.findAll(genericSpecification);
        // Search all the roles by role ids
        if (rolesIds.size() > 0) {
            for (UsersRoles role : rolesIds) {
                genericSpecification = new GenericSpecification<Roles>();
                genericSpecification.add(new SearchCriteria("idUserRoles", role.getFkRolesId(), SearchOperation.EQUAL));
                roles.addAll(rolesRepo.findAll(genericSpecification));
            }
        }
        // Add all roles to string HashSet
        if (roles.size() > 0) {
            for (Roles role : roles) {
                userRoles.add(role.getRole());
            }
        }
        return userRoles;
    }
}
