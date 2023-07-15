import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import { Suspense, useEffect, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import './App.less';
import { AppProvider } from './components/Application';
import { NProgress } from './components/NProgress';
import { localeConfigs } from './config/locale/localeConfig';
import { useBaseSetting } from './hooks';
import { routes } from './routes';
import { localeSelector } from './stores';
import { LoadingFallback } from "./components/Fallback";

const App: React.FC = () => {
    const {locale: defaultLocale, theme} = useBaseSetting();
    const [userLocale, ] = useRecoilState(localeSelector);

    const locale = userLocale ?? defaultLocale;

    const router = useMemo(() => {
        return createBrowserRouter(routes as RouteObject[]);
    }, [routes]);

    useEffect(() => {
        if (locale.toLowerCase() === 'en-us') {
            moment.locale('en');
        } else if (locale.toLowerCase() === 'zh-cn') {
            moment.locale('zh');
        }
    }, [locale]);

    const getLocale = () => {
        const lang = localeConfigs.find((item) => {
            return item.key === locale.toLowerCase();
        });
        return lang?.messages;
    };
    const getAntdLocale = () => {
        const lang = localeConfigs.find((item) => {
            return item.key === locale.toLowerCase();
        });
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
                <NProgress>
                    <Suspense fallback={<LoadingFallback />}>
                        <AppProvider>
                            <RouterProvider router={router}  />
                        </AppProvider>
                    </Suspense>
                </NProgress>
            </IntlProvider>
        </ConfigProvider>
    );
};

export default App;
