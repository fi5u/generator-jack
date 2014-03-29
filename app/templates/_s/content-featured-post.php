<?php
/**
 * The template for displaying featured posts on the front page
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($classes = array('article', 'article--featured-post')); ?>>
    <a class="post-thumbnail  article--featured-post__post-thumbnail" href="<?php the_permalink(); ?>">
    <?php
        // Output the featured image.
        if ( has_post_thumbnail() ) :
            the_post_thumbnail();
        endif;
    ?>
    </a>

    <header class="header  article__header  article--featured-post__header">
        <?php if ( in_array( 'category', get_object_taxonomies( get_post_type() ) ) && twentyfourteen_categorized_blog() ) : ?>
        <div class="header__meta  article__header-meta  article--featured-post__header__meta">
            <span class="cat-links"><?php echo get_the_category_list( _x( ', ', 'Used between list items, there is a space after the comma.', '_s' ) ); ?></span>
        </div><!-- .entry-meta -->
        <?php endif; ?>

        <?php the_title( '<h1 class="header__title  article__header-title  article--featured-post__header__title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">','</a></h1>' ); ?>
    </header><!-- .entry-header -->
</article><!-- #post-## -->
