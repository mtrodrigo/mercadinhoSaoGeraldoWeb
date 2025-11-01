export const Footer = () => {
  return (
    <footer className="mt-10 w-full border-t border-green-100 bg-green-50 py-4">
      <p className="text-center text-sm text-green-600">
        © {new Date().getFullYear()} Mercadinho São Geraldo. Todos os direitos reservados.
      </p>
    </footer>
  );
};