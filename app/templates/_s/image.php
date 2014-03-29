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
			<header class="header  article__header  article__header--image">
				<?php the_title( '<h1 class="header__title  article__header-title  article__header-title--image">', '</h1>' ); ?>

				<div class="header__meta  article__header-meta  article__header-meta--image">
					<?php
						$metadata = wp_get_attachment_metadata();
						printf( __( 'Published <span class="header__meta__date  article__header-meta__date  article__header-meta-date--image"><time datetime="%1$s">%2$s</time></span> at <a href="%3$s">%4$s &times; %5$s</a> in <a href="%6$s" rel="gallery">%7$s</a>', '_s' ),
							esc_attr( get_the_date( 'c' ) ),
							esc_html( get_the_date() ),
							esc_url( wp_get_attachment_url() ),
							$metadata['width'],
							$metadata['height'],
							esc_url( get_permalink( $post->post_parent ) ),
							get_the_title( $post->post_parent )
						);

						edit_post_link( __( 'Edit', '_s' ), '<span class="header__meta__edit-link  article--header__meta__edit-link  article__header-meta-edit-link--image">', '</span>' );
					?>
				</div>

				<nav id="image-navigation" class="header__nav  article__header__nav  article__header-nav--image" role="navigation">
					<div class="article__header-nav-dir--prev--image"><?php previous_image_link( false, __( '<span class="meta-nav">&larr;</span> Previous', '_s' ) ); ?></div>
					<div class="article__header-nav-dir--next--image"><?php next_image_link( false, __( 'Next <span class="meta-nav">&rarr;</span>', '_s' ) ); ?></div>
				</nav>
			</header>

			<div class="article__content  article__content--image">
				<div class="article__content-attachment--image">
					<div class="article__content-attachment-img--image">
						<?php _s_the_attached_image(); ?>
					</div>

					<?php if ( has_excerpt() ) : ?>
					<div class="article__content-attachment-caption--image">
						<?php the_excerpt(); ?>
					</div>
					<?php endif; ?>
				</div>

				<?php
					the_content();
					wp_link_pages( array(
						'before' => '<div class="article__links  article__content-links--image">' . __( 'Pages:', '_s' ),
						'after'  => '</div>',
					) );
				?>
			</div>

			<?php edit_post_link( __( 'Edit', '_s' ), '<footer class="footer  article__footer  article__footer--image"><span class="footer__edit-link  article__footer-edit-link  article__footer-edit-link--image">', '</span></footer>' ); ?>
		</article><!-- #post-## -->

		<?php
			// If comments are open or we have at least one comment, load up the comment template
			if ( comments_open() || '0' != get_comments_number() )
				comments_template();
		?>

	<?php endwhile; ?>

	</main>

<?php get_footer(); ?>
