import { useTranslation } from "react-i18next";
import "./AppLayout.scss";

type AppLayoutProps = {
  children: any;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }: AppLayoutProps) => {
  const { t } = useTranslation(["common"]);
  return (
    <div className="app-layout">
      <header className="app-layout__header">{t("appName")}</header>
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
