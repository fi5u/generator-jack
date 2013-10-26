<?php
/**
 * The template for displaying Search Results pages.
 *
 * @package _s
 */

get_header(); ?>

	<main class="main" role="main">

	<?php if ( have_posts() ) : ?>

		<header class="search__header">
			<h1 class="search__title"><?php printf( __( 'Search Results for: %s', '_s' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
		</header>

		<?php while ( have_posts() ) : the_post(); ?>

			<?php get_template_part( 'content', 'search' ); ?>

		<?php endwhile; ?>

		<?php _s_content_nav( 'nav-below' ); ?>

	<?php else : ?>

		<?php get_template_part( 'no-results', 'search' ); ?>

	<?php endif; ?>

	</main>

<?php get_sidebar(); ?>
<?php get_footer(); ?>