//test
import React, { useCallback, useEffect, useState } from 'react';
import SearchIcon from '../../../icons/SearchIcon';

import { debounce } from 'lodash';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DotLoadingIcon from '../../../icons/DotLoadingIcon';
import CloseIcon from '../../../icons/CloseIcon';
function CategorySearch() {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();

    const [loading, setLoading] = useState(false);

    const debouncedHandleSubmit = useCallback(
        debounce((value: string) => {
            setLoading(false); // 디바운스 시간이 경과하고 함수가 실행될 때 로딩 상태를 false로 설정
            const params = new URLSearchParams(searchParams.toString());
            if (value === '') {
                params.delete('q');
                params.delete('page');
            } else {
                params.set('q', value);
                params.delete('page');
                console.log('params', params);
            }
            navigate(pathname + '?' + params.toString(), { replace: true });
        }, 400), // 디바운스 시간을 300ms로 설정
        [searchParams, pathname],
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true); // 입력이 시작될 때 로딩 상태를 true로 설정
        debouncedHandleSubmit(e.target.value);
    };
    const handleReset = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('q');
        params.delete('page');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        navigate(pathname + '?' + params.toString(), { replace: true });
    };
    useEffect(() => {
        if (inputRef.current === null) return;
        inputRef.current.onfocus = () => setIsFocused(true);
        inputRef.current.onblur = () => setIsFocused(false);
    }, []);
    useEffect(() => {
        if (searchParams.size === 0) {
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }, [searchParams]); // 검색어가 없을 때 input 초기화, 선언적 프로그래밍 패러다임에 위반되긴 하지만, 이렇게 사용하는 것이 더 직관적이라고 판단하여 사용함

    return (
        <div
            className={`flex h-10 w-full flex-row items-center rounded-3xl border bg-gray-100 p-2 ${isFocused ? 'border-gray-400' : 'border-gray-200'} `}
        >
            <button className="flex h-full w-11 cursor-pointer items-center justify-center">
                {!loading && (
                    <SearchIcon className={`h-5 w-5 ${isFocused ? 'rotate-90 text-blue-600' : 'text-gray-600'}`} />
                )}
                {loading && (
                    <div className="h-full w-full">
                        <DotLoadingIcon />
                    </div>
                )}
            </button>
            <input
                ref={inputRef}
                onFocus={() => inputRef.current?.focus()}
                placeholder="검색"
                className="ml-2 mr-4 h-5 w-full bg-inherit text-neutral-500 outline-none"
                onChange={(e) => handleInputChange(e)}
                defaultValue={searchParams.get('q') || ''}
            />
            <button onClick={handleReset} className={` ${searchParams.get('q') ? 'block' : 'hidden'} `}>
                <CloseIcon className="h-6 w-6 text-gray-400" />
            </button>
        </div>
    );
}

export default CategorySearch;
