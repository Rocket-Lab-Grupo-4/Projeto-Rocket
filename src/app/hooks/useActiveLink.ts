import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const useActiveLink = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleLinkClick = (path: string) => {
    if (activeLink !== path) {
      setActiveLink(path);
    }
  };

  return { activeLink, handleLinkClick };
};

export default useActiveLink;
