import LoginInput from './Components/LoginInput';
import BackIcon from '../icons/BackIcon';

function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 px-6 pb-10 mx-auto h-dvh max-w-screen-tablet mobile:flex-row">
            <div className="w-full mobile:w-3/5">
                <img src="/logo.svg" className="w-full h-auto px-8" />
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-3 mobile:w- h-2/5 mobile:w-2/5 mobile:flex-grow">
                <span className="hidden my-4 text-2xl font-bold mobile:block">로그인</span>
                <LoginInput label="ID" type="text" />
                <LoginInput label="Password" type="password" />
                {/* <LoginInput label="PASSWORD" /> */}
                <button className="flex flex-row items-center justify-center w-full gap-2 py-3 mt-4 text-sm text-white bg-blue-500 border rounded-lg">
                    로그인 <BackIcon className="w-4 h-4 rotate-180" />
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
