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
				<h2 class="header__title  error-404__header__title"><?php _e( 'Oops! That page can&rsquo;t be found.', '_s' ); ?></h2>
			</header>

			<div class="content  error-404__content">
				<p><?php _e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', '_s' ); ?></p>

				<?php get_search_form(); ?>

				<?php the_widget( 'WP_Widget_Recent_Posts' ); ?>

				<?php if ( _s_categorized_blog() ) : // Only show the widget if site has multiple categories. ?>
				<div class="widgets__widget  widgets__widget--categories">
					<h2 class="widgets__widget__title  widgets__widget--categories__title"><?php _e( 'Most Used Categories', '_s' ); ?></h2>
					<ul>
					<?php
						wp_list_categories( array(
							'orderby'    => 'count',
							'order'      => 'DESC',
							'show_count' => 1,
							'title_li'   => '',
							'number'     => 10,
						) );
					?>
					</ul>
				</div>
				<?php endif; ?>

				<?php
				/* translators: %1$s: smiley */
				$archive_content = '<p>' . sprintf( __( 'Try looking in the monthly archives. %1$s', '_s' ), convert_smilies( ':)' ) ) . '</p>';
				the_widget( 'WP_Widget_Archives', 'dropdown=1', "after_title=</h2>$archive_content" );
				?>

				<?php the_widget( 'WP_Widget_Tag_Cloud' ); ?>

			</div>
		</section>

	</main>


<?php get_footer(); ?>