import { Link, useLocation } from "react-router-dom";
import { BreadcrumbsContainer } from "./index.styled";

interface BreadcrumbProps {
  homeLabel?: string;
}

export default function Breadcrumbs({ homeLabel = "Main" }: BreadcrumbProps) {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  return (
    <BreadcrumbsContainer>
      <Link to="/">{homeLabel}</Link>
      {paths.map((path, index) => {
        const to = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;
        return (
          <span key={to}>
            <span> &gt; </span>
            {isLast ? (
              <span>{decodeURIComponent(path)}</span>
            ) : (
              <Link to={to}>{decodeURIComponent(path)}</Link>
            )}
          </span>
        );
      })}
    </BreadcrumbsContainer>
  );
}
