<?php
/**
 * The Template for displaying all single posts.
 *
 * @package _s
 */

$layout = get_post_meta($post->ID, '_s_layout', true);
$classes = !empty($layout) && $layout === 'sidebar' ? 'main  with-sidebar' : 'main';

get_header(); ?>

	<main class="<?php echo $classes; ?>" role="main">

	<?php while ( have_posts() ) : the_post(); ?>

		<?php get_template_part( 'content', 'single' ); ?>

		<?php _s_content_nav( 'nav-below' ); ?>

		<?php
			// If comments are open or we have at least one comment, load up the comment template
			if ( comments_open() || '0' != get_comments_number() )
				comments_template();
		?>

	<?php endwhile; // end of the loop. ?>

	</main>

    <?php if(empty($layout) || $layout !== 'full') : ?>
        <?php get_sidebar(); ?>
    <?php endif; ?>

<?php get_footer(); ?>