// This middleware ensures that the user
// will be redirected to the "/login"
// page when NOT yet authorized!

export default async ({ $auth, redirect }) => {
  if (!$auth.loggedIn) {
    await redirect('/login')
  }
}
