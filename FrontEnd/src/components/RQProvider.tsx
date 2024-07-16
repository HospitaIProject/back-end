import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import { AxiosError } from 'axios';
import.meta.env;

function RQProviders() {
    const [client] = React.useState(
        new QueryClient({
            defaultOptions: {
                // react-query 전역 설정
                queries: {
                    refetchOnWindowFocus: false, //창이 포커스될 때마다 쿼리를 다시 가져오지 않도록 설정
                    retryOnMount: true, //컴포넌트가 마운트될 때마다 쿼리를 다시 시도함
                    refetchOnReconnect: false, //오프라인에서 다시 온라인으로 전환될 때마다 쿼리를 다시 가져오지 않도록 설정
                    retry: false, //쿼리 실패시 재시도를 하지 않도록 설정
                    throwOnError: (error: Error) => {
                        if (error instanceof AxiosError && error.response) {
                            if (400 <= error.response.status && error.response.status <= 500) return false;
                        } //400번대 에러는 에러를 던지지 않도록 설정(tryCath로 에러처리)
                        return true;
                    }, //에러가 발생하면 에러를 던지도록 설정
                },
            },
        }),
    );

    return (
        // QueryClientProvider 컴포넌트를 사용하여 자식 컴포넌트들이 react-query의 기능을 사용할 수 있게 합니다.
        // QueryClientProvider는 client prop에 QueryClient 인스턴스를 받습니다.
        <QueryClientProvider client={client}>
            <Outlet />
            {/* ReactQueryDevtools 컴포넌트를 사용하여 개발 도구를 활성화합니다. */}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}

export default RQProviders; // RQProviders 컴포넌트를 export하여 다른 파일에서 import하여 사용할 수 있게 합니다.
