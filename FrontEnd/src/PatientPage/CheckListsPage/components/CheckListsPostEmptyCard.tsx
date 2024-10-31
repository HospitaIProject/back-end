import ArrowIcon from '../../../icons/ArrowIcon';
import { Link, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

type Props = {
    day: number;
    id: number;
    name: string;
    order: number;
    today?: boolean;
    queryDate: string;
    totalCompleted: number;
};

function CheckListsPostEmptyCard({ day, id, name, order, today = false, queryDate, totalCompleted }: Props) {
    const navigate = useNavigate();
    const dateComparison = `D+${day}`;

    const handleRouteCheckListForm = () => {
        if (day + 2 > totalCompleted) {
            alert('‼️ 이전 체크리스트를 먼저 작성해주세요.');
            return;
        }
        navigate(`/patient/form/compliance/daily?id=${id}&name=${name}&diffDay=${-day}&date=${queryDate}`);
    };

    return (
        <>
            <li
                className="flex w-full cursor-pointer flex-row items-center gap-1 border-y bg-white px-4 py-3 hover:bg-blue-50"
                style={{
                    order: order,
                }}
            >
                <div className="flex w-full flex-row items-center gap-6">
                    <span className="w-12 flex-shrink-0 font-semibold text-sky-800">{dateComparison}</span>
                    <div className="flex flex-row items-center">
                        <span className="inline-block break-words text-sm text-gray-400">{`체크리스트 작성 가능`}</span>
                    </div>
                </div>
                <button
                    onClick={handleRouteCheckListForm}
                    className={`relative mx-1 flex flex-shrink-0 flex-row items-center justify-center gap-1 rounded-lg border p-2 text-gray-400 shadow-sm`}
                >
                    <span className="text-sm">작성하기</span>
                    <ArrowIcon className="h-4 w-4 text-inherit" />
                    {today && (
                        <span className="absolute -right-3 -top-3 flex items-center justify-center rounded-md bg-yellow-200 p-[2px] text-xs text-red-500">
                            New
                        </span>
                    )}
                </button>
            </li>
        </>
    );
}

export default CheckListsPostEmptyCard;
