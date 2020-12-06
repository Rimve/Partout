import React from "react";
import '../styles/Profile.css';
import ItemComponent from "./ItemsComponent";
import CreateItemComponent from "./CreateItemComponent";

class ProfileComponent extends React.Component {
    render () {
        return (
            <>
                <div className='content-container'>
                    <div className='products'>
                        <ItemComponent getMyItems={true} />
                    </div>
                    <div>
                        <CreateItemComponent />
                    </div>
                </div>
            </>
        );
    }
}

export default ProfileComponent;