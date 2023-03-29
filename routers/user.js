const express = require("express");
const { userController } = require("../controller");
const { auth } = require("../service");
const router = express.Router();

/**
 *  User 
 * @typedef {object} User
 * @property {string} username - Nom de l'utilisateur
 * @property {string} password - Le mot de l'utilisateur
 */


/**
 * GET /
 * @summary Affiche la page d'accueil
 * @tags Utilisateur
 * @return {html} 200 - Vue de la page d'accueil
 */
// GET Home page
router.get("/", userController.homePage);


/**
 * GET /signup
 * @summary Affiche la page d'inscription
 * @tags Utilisateur
 * @return {html} 200 - Vue de la page d'inscription
 */
// GET signUp Page
router.get("/signup", userController.indexSignupPage);


/**
 * POST /signup
 * @summary Inscription d'un nouvel utilisateur
 * @param {string} request.body.username - Le nom d'utilisateur de l'utilisateur
 * @param {string} request.body.password - Le mot de passe de l'utilisateur
 * @tags Utilisateur
 * @return {html} 200 - Redirige l'utilisateur vers la page d'accueil
 * @return {string} 500 - Erreur d'inscription de l'utilisateur
 * @security bearerAuth
 */
// POST signUp Page (form)
router.post("/signup", userController.signup);


/**
 * GET /login
 * @summary Affiche la vue de connexion
 * @tags Utilisateur
 * @return {html} 200 - Vue de connexion
 */
// GET Login Page
router.get("/login", userController.indexLoginPage);


/**
 * POST /login
 * @summary Connecte un utilisateur
 * @security none
 * @tags Authentification
 * @param {string} request.body.username.required - Le nom d'utilisateur de l'utilisateur à connecter
 * @param {string} request.body.password.required - Le mot de passe de l'utilisateur à connecter
 * @return {html} 302 - Redirige l'utilisateur vers la page de tableau de bord s'il est connecté avec succès, sinon le redirige vers la page de connexion avec un message d'erreur.
 */
// POST Login Page (form)
router.post("/login", userController.login);


/**
 * GET /dashboard
 * @summary Affiche le profil de l'utilisateur connecté
 * @security bearerAuth
 * @tags Dashboard
 * @return {html} 200 - Vue du profil de l'utilisateur connecté
 * @return {redirect} 302 - Redirige vers la page de connexion si l'utilisateur n'est pas connecté
 */
// GET Dashboard Page
router.get("/dashboard", auth.isLogged, userController.profile);


/**
GET /forgot
@summary Affiche la page de récupération de mot de passe
@tags Authentification
@return {html} 200 - Vue pour la page de récupération de mot de passe
*/
//GET forgot Page
router.get("/forgot", userController.forgotPassword);


/**

POST /forgot
@summary Envoie un e-mail de réinitialisation de mot de passe à l'utilisateur ayant fourni un nom d'utilisateur valide
@tags Forgot Password
@param {string} request.body.username.required - Nom d'utilisateur de l'utilisateur qui demande une réinitialisation de mot de passe
@return {html} 302 - Redirige vers la page de connexion après avoir envoyé un e-mail de réinitialisation de mot de passe
@return {html} 302 - Redirige vers la page d'inscription en cas d'échec de l'envoi de l'e-mail de réinitialisation
*/
//POST forgot Page (form)
router.post("/forgot", userController.sendPasswordResetEmail);


/**
 * GET /reset/:token
 * @summary Affiche la page de réinitialisation du mot de passe pour l'utilisateur ayant le token correspondant
 * @param {string} :token.path - Token de réinitialisation du mot de passe
 * @tags Mot de passe
 * @return {html} 200 - Vue pour la réinitialisation du mot de passe
 */ 
// GET reset page
router.get("/reset/:token", userController.resetPasswordIndexPage);


/**

POST /reset/:token
@summary Réinitialiser le mot de passe de l'utilisateur
@tags Utilisateur
@param {string} token.path - Token de réinitialisation du mot de passe
@param {string} request.body.password.required - Nouveau mot de passe de l'utilisateur
@param {string} request.body.password2.required - Confirmation du nouveau mot de passe de l'utilisateur
@return {html} 302 - Redirige vers la page de connexion
@throws {Error} 400 - Le Token de l'utilisateur a expiré ou le nouveau mot de passe ne correspond pas à la confirmation
@throws {Error} 404 - L'utilisateur n'existe pas ou le token n'a pas pu être reset
*/
// POST reset page (form)
router.post("/reset/:token", userController.resetPassword);

/**
 * GET /dashboard/schedule/newschedule
 * @summary Affiche la vue pour ajouter un nouveau planning
 * @security bearerAuth
 * @tags Planning
 * @return {html} 200 - Vue pour ajouter un nouveau planning
 */
// GET Logout Page
router.get("/logout", userController.logout);

module.exports = router;
