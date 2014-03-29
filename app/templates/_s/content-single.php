<?php
/**
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($classes = array('article', 'article--single')); ?>>
	<header class="header  article__header  article__header--single">
		<h1 class="header__title  article__header-title  article__header-title--single"><?php the_title(); ?></h1>

		<div class="header__meta  article__header-meta  article__header-meta--single">
			<?php _s_posted_on(); ?>
		</div>
	</header>

	<div class="article__content  article__content--single">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="article__links  article__links--single">' . __( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
		?>
	</div>

	<footer class="footer  article__footer article__footer--single">
		<?php
			/* translators: used between list items, there is a space after the comma */
			$category_list = get_the_category_list( __( ', ', '_s' ) );

			/* translators: used between list items, there is a space after the comma */
			$tag_list = get_the_tag_list( '', __( ', ', '_s' ) );

			if ( ! _s_categorized_blog() ) {
				// This blog only has 1 category so we just need to worry about tags in the meta text
				if ( '' != $tag_list ) {
					$meta_text = __( 'This entry was tagged %2$s. Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', '_s' );
				} else {
					$meta_text = __( 'Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', '_s' );
				}

			} else {
				// But this blog has loads of categories so we should probably display them here
				if ( '' != $tag_list ) {
					$meta_text = __( 'This entry was posted in %1$s and tagged %2$s. Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', '_s' );
				} else {
					$meta_text = __( 'This entry was posted in %1$s. Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', '_s' );
				}

			} // end check for categories on this blog

			printf(
				$meta_text,
				$category_list,
				$tag_list,
				get_permalink()
			);
		?>

		<?php edit_post_link( __( 'Edit', '_s' ), '<span class="footer__edit-link  article__footer-edit-link  article__footer-edit-link--single">', '</span>' ); ?>
	</footer>
</article>
