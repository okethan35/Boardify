import '../styles/Body.css'
import pass1 from '../assets/boarding_pass_1.jpg'
import pass2 from '../assets/boarding_pass_2.jpg'
import heart_icon from '../assets/heart-regular.svg'
import comment_icon from '../assets/comment-regular.svg'
import AuthenticateButton from './AuthenticateButton'

export default function Body(){
    return (
        <>
            <div className='body'>
                <AuthenticateButton />
                <h1>Your Feed</h1>
                <hr/>
                <div className='feed'>
                    <div className='passes'>
                        <div className='username-box'>
                            <h3 className='username'>Ester</h3>
                        </div>
                        <img src={pass1}/>
                        <div className='icon-box'>
                            <input type="image" src={heart_icon}/>
                            <input type="image" src={comment_icon}/>
                        </div>
                    </div>
                    <div className='passes'>
                        <div className='username-box'>
                            <h3 className='username'>Bob</h3>
                        </div>
                        <img src={pass2}/>
                        <div className='icon-box'>
                            <input type="image" src={heart_icon}/>
                            <input type="image" src={comment_icon}/>
                        </div>
                    </div>
                    <div className='passes'>
                        <div className='username-box'>
                            <h3 className='username'>Bloopy</h3>
                        </div>
                        <img src={pass1}/>
                        <div className='icon-box'>
                            <input type="image" src={heart_icon}/>
                            <input type="image" src={comment_icon}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}