<template>
  <!--<section class="hero app-navbar is-bold">
    <div class="hero-head">-->
      <header class="navbar is-bold">
        <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <i class="fa fa-cubes fa-2x fa-fw"></i><%= blueprint.label %>
          </router-link>
          <a class="navbar-item is-hidden-desktop" href="https://github.com/ndro/vue-webpack-buefy" target="_blank">
            <b-icon pack="fa" icon="github" type="is-black"></b-icon>
          </a>
          <div class="navbar-burger burger" data-target="navbarDropdown">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarDropdown" class="navbar-menu">
          <div class="navbar-start">

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" href="#">
                Menu
              </a>
              <div class="navbar-dropdown is-boxed">

                <%_ headerLinks.forEach((link) => { _%>
                <router-link
                  to="<%= link.href %>"
                  class="navbar-item"
                >
                  <%= link.text %>
                </router-link>
                <%_ }) _%>

              </div>
            </div>

          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-primary is-outlined" href="#">
                    <span>Button</span>
                  </a>
                </p>
                <p class="control">
                  <router-link to="/auth/login">
                    <b-icon pack="fa" icon="user"></b-icon>
                    <span>Login</span>
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </header>
    <!--</div>
  </section>-->
</template>


<script>
/* burger navigation */
// document.addEventListener('DOMContentLoaded', function () {
//   // Get all "navbar-burger" elements
//   var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
//   // Check if there are any navbar burgers
//   if ($navbarBurgers.length > 0) {
//     // Add a click event on each of them
//     $navbarBurgers.forEach(function ($el) {
//       $el.addEventListener('click', function () {
//         // Get the target from the "data-target" attribute
//         var target = $el.dataset.target
//         var $target = document.getElementById(target)
//         // Toggle the class on both the "navbar-burger" and the "navbar-menu"
//         $el.classList.toggle('is-active')
//         $target.classList.toggle('is-active')
//       })
//     })
//   }
// })

export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #e0e0e0;
}
</style>
