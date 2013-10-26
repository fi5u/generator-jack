<?php
/**
 * The template for displaying image attachments.
 *
 * @package _s
 */

get_header(); ?>

	<main class="main" role="main">

	<?php while ( have_posts() ) : the_post(); ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class('article--image'); ?>>
			<header class="article--image__header">
				<?php the_title( '<h1 class="article--image__title">', '</h1>' ); ?>

				<div class="article--image__meta">
					<?php
						$metadata = wp_get_attachment_metadata();
						printf( __( 'Published <span class="article--image__meta__date"><time datetime="%1$s">%2$s</time></span> at <a href="%3$s">%4$s &times; %5$s</a> in <a href="%6$s" rel="gallery">%7$s</a>', '_s' ),
							esc_attr( get_the_date( 'c' ) ),
							esc_html( get_the_date() ),
							esc_url( wp_get_attachment_url() ),
							$metadata['width'],
							$metadata['height'],
							esc_url( get_permalink( $post->post_parent ) ),
							get_the_title( $post->post_parent )
						);

						edit_post_link( __( 'Edit', '_s' ), '<span class="edit-link">', '</span>' );
					?>
				</div>

				<nav id="image-navigation" class="article--image__header__nav" role="navigation">
					<div class="article--image__header__nav__dir--prev"><?php previous_image_link( false, __( '<span class="meta-nav">&larr;</span> Previous', '_s' ) ); ?></div>
					<div class="article--image__header__nav__dir--next"><?php next_image_link( false, __( 'Next <span class="meta-nav">&rarr;</span>', '_s' ) ); ?></div>
				</nav>
			</header>

			<div class="article--image__content">
				<div class="article--image__attachment">
					<div class="article--image__img">
						<?php _s_the_attached_image(); ?>
					</div>

					<?php if ( has_excerpt() ) : ?>
					<div class="article--image__caption">
						<?php the_excerpt(); ?>
					</div>
					<?php endif; ?>
				</div>

				<?php
					the_content();
					wp_link_pages( array(
						'before' => '<div class="page-links">' . __( 'Pages:', '_s' ),
						'after'  => '</div>',
					) );
				?>
			</div>

			<?php edit_post_link( __( 'Edit', '_s' ), '<footer class="article--image__footer"><span class="edit-link">', '</span></footer>' ); ?>
		</article><!-- #post-## -->

		<?php
			// If comments are open or we have at least one comment, load up the comment template
			if ( comments_open() || '0' != get_comments_number() )
				comments_template();
		?>

	<?php endwhile; ?>

	</main>

<?php get_footer(); ?>
