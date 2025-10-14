export function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

export function calcularPesoIdeal(altura) {
  const IMC_IDEAL = 22;
  return IMC_IDEAL * altura * altura;
}

export function validarDatos(peso, altura) {
  if (isNaN(peso) || peso <= 0) return 'Peso inválido';
  if (isNaN(altura) || altura <= 0) return 'Altura inválida';
  return '';
}
