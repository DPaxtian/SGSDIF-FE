export const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'gray.700',
  fontWeight: 'normal',
  fontSize: 'xs',
  paddingY: 1,
  paddingX: 2,
  height: 'auto',
  minHeight: '30px',
  display: 'inline-flex', // Asegúrate de que el botón sea inline-flex para ajustar al contenido
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: 'auto', // El ancho se ajusta al contenido
  _hover: {
    textDecoration: 'none', // Remueve otros estilos de hover como el backgroundColor
    // No es necesario un pseudo-elemento aquí
  },
  // Aplica la transición al subrayado
  transition: 'background-size 0.3s ease-in-out',
  // Estilo para el contenedor del texto y el ícono
  _hover: {
    _after: {
      width: '100%', // El subrayado debe cubrir todo el contenido
    },
  },
  _after: {
    content: '""',
    position: 'absolute',
    width: '0%', // Empieza sin mostrar el subrayado
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: 'currentColor', // Usa el color actual del texto
    transition: 'width 0.3s ease-in-out', // Suaviza la transición del ancho
  },
};