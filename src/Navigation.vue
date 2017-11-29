<template>
<div>
<nav class="navbar navbar-expand-lg navbar-dark indigo">
    <!-- Navbar brand -->
    <a class="navbar-brand" href="#">Winston Fale</a>
    <!-- Collapse button -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
    <!-- Collapsible content -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Links -->
        <ul class="navbar-nav mr-auto">
            <li class="nav-item" :class="{ 'active' : $route.path == '/' }">
                <router-link to="/"><a class="nav-link">Home</a></router-link>
            </li>
            <li class="nav-item" :class="{ 'active' : $route.path == '/projects' }">
                <router-link to="/projects"><a class="nav-link">Projects</a></router-link>
            </li>
            <li class="nav-item" :class="{ 'active' : $route.path == '/contact' }">
                <router-link to="/contact"><a class="nav-link">Contact</a></router-link>
            </li>
            <li class="nav-item" :class="{ 'active' : $route.path == '/others' }">
                <router-link to="/others"><a class="nav-link">Others</a></router-link>
            </li>
            <!-- Dropdown -->
            <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li> -->
        </ul>
        <!-- Links -->
        <!-- Search form -->
        <!-- <form class="form-inline">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
        </form> -->
    </div>
    <!-- Collapsible content -->
    </nav>
</div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {message: 'awe'
    }
  }
}
</script>