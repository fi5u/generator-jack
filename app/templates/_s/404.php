<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package _s
 */

get_header(); ?>


	<main class="main" role="main">

		<section class="error-404">
			<header class="header  error-404__header">
                <?php //TRANSLATORS: &rsquo; represents an apostrophe ?>
				<h2 class="header__title  error-404__header-title"><?php _e( 'Oops! That page can&rsquo;t be found.', '_s' ); ?></h2>
			</header>

			<div class="content  error-404__content">
				<p><?php _e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', '_s' ); ?></p>

				<?php get_search_form(); ?>
			</div>
		</section>

	</main>

<?php get_sidebar(); ?>
<?php get_footer(); ?>