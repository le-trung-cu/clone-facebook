exports.generateRandomCode = (length) => {
  if(process.env.NODE_ENV === 'dev')
    return '8888'
    
  const charset = '0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return code
}
