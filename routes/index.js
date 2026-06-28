var express = require('express');
var router = express.Router();
router.get('/favicon.ico', (req, res) => res.status(204).end()); 


/* GET home page. */
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      res.render('index', { 
        title: 'Downtown Donuts', 
        todos: results, 
        dark_bg_logo: 'images/dark_bg_logo.png',
        dropdown: 'images/dropdown.png'});    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* GET menu page. */
router.get('/menu', function(req, res, next) {
  try {
    // Render the 'menu.pug' file located in your views folder
    res.render('menu', { 
      title: 'Our Menu - Downtown Donuts',
      dark_bg_logo: '/images/dark_bg_logo.png',
      dropdown: '/images/dropdown.png'
    });
  } catch (error) {
    console.error('Error loading menu page:', error);
    res.status(500).send('Error loading menu page');
  }
});

router.get('/about', function(req, res, next) {
  try {
    // Render the 'menu.pug' file located in your views folder
    res.render('about', { 
      title: 'About Us - Downtown Donuts',
      dark_bg_logo: '/images/dark_bg_logo.png',
      dropdown: '/images/dropdown.png'
    });
  } catch (error) {
    console.error('Error loading about page:', error);
    res.status(500).send('Error loading about page');
  }
});

router.get('/reviews', function(req, res, next) {
  try {
    // Render the 'menu.pug' file located in your views folder
    res.render('reviews', { 
      title: 'reviews - Downtown Donuts',
      dark_bg_logo: '/images/dark_bg_logo.png',
      dropdown: '/images/dropdown.png'
    });
  } catch (error) {
    console.error('Error loading reviews page:', error);
    res.status(500).send('Error loading reviews page');
  }
});

router.post('/create', function (req, res, next) {
    const { task } = req.body;
    try {
      req.db.query('INSERT INTO todos (task) VALUES (?);', [task], (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }
        console.log('Todo added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).send('Error adding todo');
    }
});

router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        console.log('Todo deleted successfully:', results);
        // Redirect to the home page after deletion
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Error deleting todo:');
    }
});


module.exports = router;