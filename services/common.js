import passport from 'passport';

export function isAuth(req, res, done) {
  if (req.user) {
    done();
  } else {
    res.status(401).send(Unathorised);
  }
}