<?php
/**
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($classes = array('article', 'article--single')); ?>>
	<header class="header  article__header  article--single__header">
		<h1 class="header__title  article__header__title  article--single__header__title"><?php the_title(); ?></h1>

		<div class="header__meta  article__header__meta  article--single__header__meta">
			<?php _s_posted_on(); ?>
		</div>
	</header>

	<div class="article__content  article--single__content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="article__content__links  article--single__content__links">' . __( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
		?>
	</div>

	<footer class="footer  article__footer article--single__footer">
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

		<?php edit_post_link( __( 'Edit', '_s' ), '<span class="footer__edit-link  article__footer__edit-link  article--single__footer__edit-link">', '</span>' ); ?>
	</footer>
</article>
