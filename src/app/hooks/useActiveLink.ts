import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const useActiveLink = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    const firstSegment = pathname.split("/")[1];
    setActiveLink(`/${firstSegment}`);
  }, [pathname]);

  const handleLinkClick = (path: string) => {
    if (activeLink !== path) {
      setActiveLink(path);
    }
  };

  return { activeLink, handleLinkClick };
};

export default useActiveLink;
