const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });

    console.log(postData);
    const post = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      post,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, 
      { 
        include: 
        [
          { 
            model: User, 
              attributes: ['name']
          },
          {
            model: Comment,
              // include: [
              //   {
              //     model: User
              //   }
              // ]
          },
          
        ] 
      }
    )
    const post = postData.get({ plain: true })
    // console.log(JSON.parse(JSON.stringify(post.comments)))

    // const commentData = await Comment.findAll({where: post_id = req.params.id})
    // const comments = commentData.map((comment) => comment.get({ plain: true }));
    // console.log(comments)
    res.render('post', { post , logged_in: req.session.logged_in})
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const profileData = await User.findByPk(req.session.user_id, { include: [{ model: Post }] })
    const user = profileData.get({ plain: true })
    const postsData = await Post.findAll({where:user_id = req.session.user_id})
    const posts = postsData.map((post) => post.get({plain:true}))//can I combine these two objects manually?
    // console.log(user)
    // user.posts = posts
    console.log(JSON.parse(JSON.stringify(user)))

    res.render('dashboard', { user, posts: user.posts, logged_in: req.session.logged_in }) //can I pass multiple objects to handlebars
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/login', (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
