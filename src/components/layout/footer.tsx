export default function Footer() {
  return (
    <footer className="w-full bg-black text-center py-4 text-sm text-[#FFD700] border-t border-[#FFD700]">
      © {new Date().getFullYear()} GlamGiant Inc. - Todos los derechos reservados.
    </footer>
  );
}
