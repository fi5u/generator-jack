<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('article--page'); ?>>
	<header class="article--page__header">
		<h1 class="article--page__header__title"><?php the_title(); ?></h1>
	</header>

	<div class="article--page__content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
		?>
	</div>
	<?php edit_post_link( __( 'Edit', '_s' ), '<footer class="article--page__footer"><span class="edit-link">', '</span></footer>' ); ?>
</article>
