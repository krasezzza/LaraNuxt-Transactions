// This middleware ensures that the user
// will be redirected to the "/"
// page when already authorized!

export default async ({ $auth, redirect }) => {
  if ($auth.loggedIn) {
    await redirect('/')
  }
}
