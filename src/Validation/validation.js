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

const schemaModal = Yup.object().shape({
   name: Yup.string().required('O nome é obrigatório'),
   email: Yup.string().email('Formato de e-mail inválido').required('O e-mail é obrigatório'),
   phone: Yup.string().matches(/^(\(\d{2}\)\s?)?\d{5}-?\d{4}$/, 'Número de telefone inválido').required('O telefone é obrigatório'),
   extra: Yup.string().notRequired()
});

const schemaPerfil = Yup.object().shape({
   name: Yup.string().notRequired(),
   image: Yup.string().notRequired()
});

export { schemaLogin, schemaConta, schemaModal, schemaPerfil };