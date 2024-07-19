import { useState } from 'react';
import ArrowIcon from '../../../icons/ArrowIcon';

function ComplicationGuide() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex w-full p-2 border-2">
            <div className="mx-auto font-serif text-gray-600">
                <div className="flex flex-row justify-between mb-2">
                    <span className="text-sm">{`<Clavien-Dindo Classification>`}</span>
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>
                        <ArrowIcon
                            className={`h-5 w-5 transform text-gray-500 transition-all duration-500 ${isOpen ? '-rotate-90' : 'rotate-90'}`}
                        />
                    </button>
                </div>

                <ul
                    className={`${isOpen ? 'max-h-96' : 'max-h-0'} flex flex-col gap-1 overflow-hidden pl-5 text-sm transition-all duration-500`}
                >
                    <li className="break-all">
                        I: 수술 후 정상 과정의 variation / 진통제, 해열제, 이뇨제 사용, simple dressing 허용.
                    </li>
                    <li className="break-all">II: 수혈, TPN을 포함한 pharmacological treatment를 요하는 경우.</li>
                    <li className="break-all">
                        IIIa: 수술, 내시경, 혹은 영상의학에서의 intervention을 요하는 경우, 부분마취.
                    </li>
                    <li className="break-all">
                        IIIb: 수술, 내시경, 혹은 영상의학에서의 intervention을 요하는 경우, 전신마취.
                    </li>
                    <li className="break-all">IVa: ICU care를 요하는 life-threatening complication, 단일장기 부전.</li>
                    <li className="break-all">IVb: ICU care를 요하는 life-threatening complication, 다장기 부전.</li>
                </ul>
            </div>
        </div>
    );
}

export default ComplicationGuide;
