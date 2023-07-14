import { ReactComponent as LogoSvg } from '@/assets/logo/nika_logo.svg';
import { formatById } from "@/locales";
import classNames from "classnames";

interface AppLogoProps {
  showTitle?: boolean;
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = (props) => {
  const { showTitle = true, className } = props;
  const rootClsName = classNames('flex justify-center items-center cursor-pointer text-base transition-all duration-500 ', className)
  return (
    <div className={rootClsName}>
      <span className="w-16 flex-none flex items-center justify-center">
        <LogoSvg />
      </span>
      {
        showTitle ? (
          <span className="flex-1 font-bold transition-all duration-500 leading-normal text-white">
            {formatById('global.app.name')}
          </span>
        ) : null
      }
    </div>
  );
};

export default AppLogo;
