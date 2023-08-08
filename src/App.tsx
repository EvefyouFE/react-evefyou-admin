/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import { useRecoilValue } from "recoil";
import { Suspense, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { RouterProvider } from 'react-router-dom';
import './App.less';
import { AppProvider } from './components/Application';
import { NProgress } from './components/NProgress';
import { localeConfig } from './config/locale/localeConfig';
import { LoadingFallback } from "./components/Fallback";
import { useUserRecoilState } from "./stores/user";
import { appAtom } from "./stores/app";
import { router } from "./routes";
import { AxiosInterceptor } from "./api/request/AxiosInterceptor";

const App: React.FC = () => {
    const { projectConfig: { baseSetting: { theme } } } = useRecoilValue(appAtom)
    const [, { getDefaultLocale }] = useUserRecoilState();
    const locale = getDefaultLocale();

    useEffect(() => {
        if (locale.toLowerCase() === 'en-us') {
            moment.locale('en');
        } else if (locale.toLowerCase() === 'zh-cn') {
            moment.locale('zh');
        }
    }, [locale]);

    const getLocale = () => {
        const lang = localeConfig.find((item) => item.key === locale.toLowerCase());
        return lang?.messages;
    };
    const getAntdLocale = () => {
        const lang = localeConfig.find((item) => item.key === locale.toLowerCase());
        return lang?.antdMessages;
    };

    return (
        <ConfigProvider
            theme={{
                token: theme
            }}
            locale={getAntdLocale()}
        >
            <IntlProvider locale={locale} messages={getLocale()} onError={(err) => {
                if (err.code === 'MISSING_TRANSLATION') {
                    console.warn(`intl error: ${err.message}`);
                    return;
                }
                throw err;
            }}>
                <AxiosInterceptor />
                <NProgress>
                    <Suspense fallback={<LoadingFallback />}>
                        <AppProvider>
                            <RouterProvider router={router} />
                        </AppProvider>
                    </Suspense>
                </NProgress>
            </IntlProvider>
        </ConfigProvider>
    );
};

export default App;
