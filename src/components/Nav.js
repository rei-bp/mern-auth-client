import { Link } from 'react-router-dom'

export default function Nav (props) {

    //if the user is logged in
    const loggedIn = (
        <>
            <Link to="/profile">
                profile
            </Link>

            <Link to="/">
                <span onClick={props.handleLogout}>Logout!</span>
            </Link>
        </>
    )

    //if the user is logged out
    const loggedOut =(
    <>
        <Link to="/login">
            Login
        </Link>

        <Link to="/register">
            register
        </Link>
    </>
    )
    return (
        <nav>
            <Link to="/">
                home
            </Link>
            
            
        {props.currentUser ? loggedIn : loggedOut}
        </nav>
    )
}