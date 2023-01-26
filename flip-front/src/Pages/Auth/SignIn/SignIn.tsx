import { useNavigate } from 'react-router-dom';
import { AuthBg } from '../../../Components/Auth/AuthBg';
import './SignInStyle.css';

export const SignIn = () => {
    const navigate = useNavigate();

    return (
        <AuthBg>
            <div className='header'>Вхід</div>
            <form>
                <input type="text" placeholder='E-Mail або нікнейм'/>
                <input type="password" placeholder='Пароль'/>
                <button type="submit">Увійти</button>
            </form>
            <div className='other'>
                <div className='data'>
                    <div className='fake-btn'>Запам'ятати дані</div>
                    <div className='fake-btn'>Забув(ла) пароль?</div>
                </div>
                <div className='or'>
                    <svg width="230" height="2" viewBox="0 0 181 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="1" x2="180.5" y2="1" stroke="black" stroke-linecap="square"/>
                    </svg>
                    <div>
                        або
                    </div>
                    <svg width="230" height="2" viewBox="0 0 181 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="1" x2="180.5" y2="1" stroke="black" stroke-linecap="square"/>
                    </svg>
                </div>
                <div className='other-btn'>
                    <button>Зареєструватись</button>
                    <div className='fake-btn cancel' onClick={() => navigate('/')}>Скасувати</div>
                </div>
            </div>
        </AuthBg>
    );
}