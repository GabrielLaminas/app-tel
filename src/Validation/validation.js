import * as Yup from "yup";

const schemaLogin = Yup.object().shape({
   email: Yup.string().email('Formato de e-mail inválido').required('O e-mail é obrigatório'),
   password: Yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('A senha é obrigatória')
});

const schemaConta = Yup.object().shape({
   name: Yup.string().required('O nome é obrigatório'),
   email: Yup.string().email('Formato de e-mail inválido').required('O e-mail é obrigatório'),
   password: Yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('A senha é obrigatória')
});

export { schemaLogin, schemaConta };