import { Link } from 'react-router-dom';
import ArrowIcon from '../../icons/ArrowIcon';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import { PatientType } from '../../models/PatientType';

function PatientSummaryCard({ userData }: { userData: PatientType }) {
    const { allDate: operationDate } = useDateFormatted(userData.opertationDate);

    return (
        <Link
            to={`/patient/form/compilance/${userData.id}`}
            className="flex w-full cursor-pointer flex-row items-center justify-between rounded-md border bg-gray-50 p-4 shadow-sm hover:bg-gray-100"
        >
            <div className="flex flex-col gap-2">
                <div className="flex flex-row flex-wrap items-center gap-4">
                    <span className="text-lg font-semibold text-sky-800">{userData.name}</span>
                    <span className="inline-block break-words text-sm text-gray-700">
                        등록번호: <span className="font-medium text-gray-900">{userData.patientNumber}</span>
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="inline-block break-words text-sm text-gray-700">
                        수술일자: <span className="font-medium text-gray-900">{operationDate}</span>
                    </span>
                    <span className="inline-block break-words text-sm text-gray-600">
                        수술명: <span className="font-medium text-gray-900"> {userData.operationMethod}</span>
                    </span>
                </div>
            </div>
            <ArrowIcon className="h-5 w-5" />
        </Link>
    );
}

export default PatientSummaryCard;
