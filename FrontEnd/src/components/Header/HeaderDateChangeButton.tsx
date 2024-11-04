import { Link, useLocation } from 'react-router-dom';
import ChangeIcon from '../../icons/ChangeIcon';
import ArrowTurnIcon from '../../icons/ArrowTurnIcon';

function HeaderDateChangeButton() {
    const year_ = sessionStorage.getItem('year');
    const month_ = sessionStorage.getItem('month');
    const parameter = (year_ ? `year=${year_}` : '') + (month_ ? `&month=${month_}` : '');

    const { pathname } = useLocation();

    if (pathname === '/patient')
        return (
            <Link to={`/?${parameter}`} className="flex flex-row items-center gap-2 font-semibold text-gray-700">
                {/* <ArrowIcon className="w-8 h-8 transform rotate-180 text-inherit" /> */}
                <ChangeIcon className="h-4 w-4" />
                <span className="text-sm">
                    {year_ ? year_ + '년' : '전체'} {month_ && month_ + '월'}
                </span>
            </Link>
        );

    if (pathname === '/') {
        return (
            <Link to={`/patient?${parameter}`} className="flex flex-row items-center gap-2 font-semibold text-gray-700">
                {/* <ArrowIcon className="w-8 h-8 transform rotate-180 text-inherit" /> */}
                <ArrowTurnIcon className="h-4 w-4 -rotate-90" />
                <span className="text-sm">
                    {year_ ? year_ + '년' : '전체'} {month_ && month_ + '월'}
                </span>
            </Link>
        );
    }
}

export default HeaderDateChangeButton;
