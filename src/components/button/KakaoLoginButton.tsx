import Image from 'next/image';
import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';
import { Language, Combine, Size } from '../../global-config/globalType';
import Module from '../../styles/button/kakao-login.module.css';

type KakaoLoginButtonProps = Combine<
  {
    buttonSize: number | Size;
    language?: Language;
  },
  ComponentPropsWithoutRef<'button'>
>;

const getSize = (size: Size) => {
  const windowWidth: number = window.innerWidth;
  switch (size) {
    case 'sm':
      return windowWidth * 0.55;
    case 'md':
      return windowWidth * 0.7;
    case 'lg':
      return windowWidth * 0.85;
    default:
      return windowWidth;
  }
};

const KakaoLoginButton = forwardRef(
  ({ buttonSize, language, ...props }: KakaoLoginButtonProps, ref: Ref<HTMLButtonElement>) => {
    const realSize = Number.isInteger(buttonSize) ? (buttonSize as number) : getSize(buttonSize as Size);
    const symbolSize = realSize / 11 > 30 ? 30 : realSize / 11;
    const containerHeight = symbolSize * 3 > 70 ? 70 : symbolSize * 3;

    return (
      <button className={Module.container} style={{ width: realSize, height: containerHeight }} ref={ref} {...props}>
        <div className={Module.symbolWrapper}>
          <Image src="/kakao_symbol.png" alt="kakao symbol" width={symbolSize} height={symbolSize} />
        </div>
        <div className={Module.labelWrapper}>{language === 'en' ? 'Login with Kakao' : '카카오 로그인'}</div>
      </button>
    );
  }
);
KakaoLoginButton.displayName = 'Kakao Login Button';

export default KakaoLoginButton;
