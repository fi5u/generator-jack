<?php
/**
 * The template for displaying image attachments.
 *
 * @package _s
 */

get_header(); ?>

	<main class="main" role="main">

	<?php while ( have_posts() ) : the_post(); ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class($classes = array('article', 'article--image')); ?>>
			<header class="header  article__header  article--image__header">
				<?php the_title( '<h1 class="header__title  article__header__title  article--image__header__title">', '</h1>' ); ?>

				<div class="header__meta  article__header__meta  article--image__header__meta">
					<?php
						$metadata = wp_get_attachment_metadata();
						printf( __( 'Published <span class="header__meta__date  article__header__meta__date  article--image__header__meta__date"><time datetime="%1$s">%2$s</time></span> at <a href="%3$s">%4$s &times; %5$s</a> in <a href="%6$s" rel="gallery">%7$s</a>', '_s' ),
							esc_attr( get_the_date( 'c' ) ),
							esc_html( get_the_date() ),
							esc_url( wp_get_attachment_url() ),
							$metadata['width'],
							$metadata['height'],
							esc_url( get_permalink( $post->post_parent ) ),
							get_the_title( $post->post_parent )
						);

						edit_post_link( __( 'Edit', '_s' ), '<span class="header__meta__edit-link  article--header__meta__edit-link  article--image__header__meta__edit-link">', '</span>' );
					?>
				</div>

				<nav id="image-navigation" class="header__nav  article__header__nav  article--image__header__nav" role="navigation">
					<div class="article--image__header__nav__dir--prev"><?php previous_image_link( false, __( '<span class="meta-nav">&larr;</span> Previous', '_s' ) ); ?></div>
					<div class="article--image__header__nav__dir--next"><?php next_image_link( false, __( 'Next <span class="meta-nav">&rarr;</span>', '_s' ) ); ?></div>
				</nav>
			</header>

			<div class="content  article__content  article--image__content">
				<div class="article--image__content__attachment">
					<div class="article--image__content__attachment__img">
						<?php _s_the_attached_image(); ?>
					</div>

					<?php if ( has_excerpt() ) : ?>
					<div class="article--image__content__attachment__caption">
						<?php the_excerpt(); ?>
					</div>
					<?php endif; ?>
				</div>

				<?php
					the_content();
					wp_link_pages( array(
						'before' => '<div class="content__links  article__content__links  article--image__content__links">' . __( 'Pages:', '_s' ),
						'after'  => '</div>',
					) );
				?>
			</div>

			<?php edit_post_link( __( 'Edit', '_s' ), '<footer class="footer  article__footer  article--image__footer"><span class="footer__edit-link  article__footer__edit-link  article--image__footer__edit-link">', '</span></footer>' ); ?>
		</article><!-- #post-## -->

		<?php
			// If comments are open or we have at least one comment, load up the comment template
			if ( comments_open() || '0' != get_comments_number() )
				comments_template();
		?>

	<?php endwhile; ?>

	</main>

<?php get_footer(); ?>
