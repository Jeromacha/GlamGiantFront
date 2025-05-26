export default function Footer() {
  return (
    <footer className="w-full bg-black text-center py-4 text-sm text-title border-t border-[#DAA85B]">
      © {new Date().getFullYear()} GlamGiant Inc. - Todos los derechos reservados.
    </footer>
  );
}
