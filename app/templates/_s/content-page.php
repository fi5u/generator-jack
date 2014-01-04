<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($classes = array('article', 'article--page')); ?>>
	<header class="header  article__header  article--page__header">
		<h1 class="header__title  article__header__title  article--page__header__title"><?php the_title(); ?></h1>
	</header>

	<div class="article__content  article--page__content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="article__content__links  article--page__content__links">' . __( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
		?>
	</div>
	<?php edit_post_link( __( 'Edit', '_s' ), '<footer class="footer  article__footer  article--page__footer"><span class="footer__edit-link  article__footer__edit-link  article--page__footer__edit-link">', '</span></footer>' ); ?>
</article>
