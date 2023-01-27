import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthBg } from '../../../Components/Auth/AuthBg';
import './SignInStyle.css';

export const SignIn = () => {
    const navigate = useNavigate();
    const [visible, setVisoiblity] = useState(false);

    useEffect(() => {
        document.title = "SignIn | Flip";
    }, []);

    return (
        <AuthBg>
            <div className='header'>Вхід</div>
            <form>
                <input type="text" placeholder='E-Mail або нікнейм'/>
                <input type={visible ? "text" : "password"} placeholder='Пароль'/>
                <svg onClick={() => setVisoiblity(visible => !visible)} className='password-show' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z" stroke="#939292" strokeWidth="2"/>
                </svg>
                <button className='btn-log' type="submit">Увійти</button>
            </form>
            <div className='other'>
                <div className='data'>
                    <div className='fake-btn'>Запам'ятати дані</div>
                    <div className='fake-btn'>Забув(ла) пароль?</div>
                </div>
                <div className='or'>
                    <svg width="230" height="2" viewBox="0 0 181 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="1" x2="180.5" y2="1" stroke="black" strokeLinecap="square"/>
                    </svg>
                    <div>
                        або
                    </div>
                    <svg width="230" height="2" viewBox="0 0 181 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="1" x2="180.5" y2="1" stroke="black" strokeLinecap="square"/>
                    </svg>
                </div>
                <div className='other-btn'>
                    <button className="btn-reg">Зареєструватись</button>
                    <div className='fake-btn cancel' onClick={() => navigate('/')}>Скасувати</div>
                </div>
            </div>
        </AuthBg>
    );
}