import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const onRouteMainPage = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col bg-yellow-300">
            <span>성모병원</span>
            <button onClick={onRouteMainPage}>페이지이동</button>
        </div>
    );
}

export default LoginPage;
