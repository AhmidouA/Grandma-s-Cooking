``` js signUp post (ancien code)
//module sinUp (form)
  async signup(req, res) {

    const hash = await bcrypt.hash(req.body.password, 10)

    console.log(chalk.bgBlue("{ hash>>>>>>> }", hash));
    const user = {
      username: req.body.username,
      password: hash,
    };
    console.log(chalk.bgBlue("{ user.username>>>>>>> }", user.username));

    // Vérifier si le username existe déja dans la bdd
    const existingUser = await User.findOne({username: user.username});
    if (existingUser) {
      console.log(chalk.red(`Le username est déjà utilisé: ${user.username}`));
      res.send(`Le username est déjà utilisé: ${user.username}`)
    }

    try {
      await User.create(user)
      console.log(chalk.bgBlue(`l'utilisateur ${user.username} a bien été inscrit `));
      res.render("index")
    } catch (err) {
      console.error(chalk.bgRedBright(err))
      res.send(`l'utilisateur ${user.username} n'a pas pu etre inscrit`);

    }
  },
```