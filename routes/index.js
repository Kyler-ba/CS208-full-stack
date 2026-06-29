var express = require('express');
var router = express.Router();
router.get('/favicon.ico', (req, res) => res.status(204).end()); 


/* Directs User to Home page */
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

/* Directs User to Menu page */
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

/* Directs User to About page */
router.get('/about', function(req, res, next) {
  try {
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

/* Directs User to Reviews page */
router.get('/reviews', function(req, res, next) {
  req.db.query('SELECT * FROM reviews ORDER BY created_at DESC;', (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      return res.status(500).send('Error loading reviews');
    }
    res.render('reviews', { 
      title: 'Reviews - Downtown Donuts',
      dark_bg_logo: '/images/dark_bg_logo.png',
      dropdown: '/images/dropdown.png',
      reviewsList: results 
    });
  });
});

/* allows user to submit a review*/
router.post('/submit-review', function(req, res, next) {
  const { name, comment } = req.body;
  try {
    // Insert form input fields directly into the table rows
    req.db.query('INSERT INTO reviews (name, comment) VALUES (?, ?);', [name, comment], (err, results) => {
      if (err) {
        console.error('Error saving review:', err);
        return res.status(500).send('Error saving review');
      }
      console.log('Review saved successfully:', results);
      
      // Refresh page to instantly show the newly added post
      res.redirect('/reviews');
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).send('Error adding review');
  }
});

/* Allows for review deletion */
router.post('/delete-review', function (req, res, next) {
  const { id } = req.body;
  try {
    req.db.query('DELETE FROM reviews WHERE id = ?;', [id], (err, results) => {
      if (err) {
        console.error('Error deleting review:', err);
        return res.status(500).send('Error deleting review');
      }
      res.redirect('/reviews');
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).send('Error deleting review');
  }
});

/* Allows the user to edit the reviews */
router.post('/edit-review', function (req, res, next) {
  const { id, comment } = req.body;
  try {
    req.db.query('UPDATE reviews SET comment = ? WHERE id = ?;', [comment, id], (err, results) => {
      if (err) {
        console.error('Error updating review:', err);
        return res.status(500).send('Error updating review');
      }
      res.redirect('/reviews');
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).send('Error updating review');
  }
});

module.exports = router;
