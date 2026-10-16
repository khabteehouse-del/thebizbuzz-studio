import { unbounded } from "./font";
import "./design.css";

export default function DesignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={unbounded.variable}>{children}</div>;
}
