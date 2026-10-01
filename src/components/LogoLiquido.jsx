import "./LogoLiquido.css";

/*
 * El logo LYCH llenándose de líquido. `nivel` va de 0 (vacío) a 1 (lleno).
 * La silueta del logo hace de recipiente; el líquido sube con una ola en la
 * superficie y las líneas del dibujo quedan encima.
 */
export default function LogoLiquido({ nivel = 0, className = "" }) {
  return (
    <div className={`liquido ${className}`} style={{ "--nivel": nivel }} aria-hidden="true">
      <div className="liquido__vacio" />
      <div className="liquido__recipiente">
        <div className="liquido__masa">
          <svg className="liquido__ola" viewBox="0 0 200 20" preserveAspectRatio="none">
            <path d="M0 10 Q 25 0 50 10 T 100 10 T 150 10 T 200 10 V 20 H 0 Z" />
          </svg>
        </div>
      </div>
      <div className="liquido__lineas" />
    </div>
  );
}
